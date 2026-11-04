import pytest


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "Nexus" in data["service"]


def test_create_contact_enquiry_success(client):
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "company": "Acme Corp",
        "phone": "+1-555-0199",
        "message": "We need help modernizing our legacy infrastructure on AWS.",
        "service": "cloud-migration",
        "budget": "25k-50k",
        "source": "contact",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert "submitted" in data["message"].lower()


def test_create_project_enquiry_success(client):
    payload = {
        "name": "Alex Tech",
        "email": "alex@enterprise.com",
        "company": "Enterprise AI Inc",
        "message": "Looking for Enterprise AI and RAG workflow integration with our data warehouse.",
        "service": "ai-integration",
        "budget": "50k-100k",
        "source": "project",
    }
    response = client.post("/api/v1/projects", json=payload)
    assert response.status_code == 201
    assert response.json()["success"] is True


def test_create_service_enquiry_success(client):
    payload = {
        "name": "Sam Carter",
        "email": "sam@devcorp.com",
        "company": "DevCorp",
        "message": "Interested in custom enterprise API backend development using FastAPI.",
        "service": "software-development",
        "source": "service",
    }
    response = client.post("/api/v1/services", json=payload)
    assert response.status_code == 201
    assert response.json()["success"] is True


def test_enquiry_validation_failure(client):
    # Missing required message and invalid email
    payload = {
        "name": "J",
        "email": "not-an-email",
        "message": "Too short",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422


def test_honeypot_spam_rejection(client):
    payload = {
        "name": "Bot Spammer",
        "email": "bot@spam.com",
        "message": "Buy cheap things now on our website!",
        "website": "http://spamsite.xyz",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422 or response.status_code == 400


def test_admin_unauthorized_access(client):
    response = client.get("/api/v1/admin/enquiries")
    assert response.status_code == 401


def test_admin_login_invalid_credentials(client, seeded_admin):
    response = client.post(
        "/api/v1/admin/login",
        json={"username": "testadmin", "password": "WrongPassword123!"},
    )
    assert response.status_code == 401


def test_admin_flow_login_view_update(client, seeded_admin):
    # 1. Create an enquiry first
    enquiry_payload = {
        "name": "Sarah Connor",
        "email": "sarah@cyberdyne.org",
        "company": "Cyberdyne Systems",
        "message": "We need managed IT services and cloud architecture review.",
        "service": "managed-it",
        "budget": "100k-plus",
        "source": "contact",
    }
    create_res = client.post("/api/v1/contact", json=enquiry_payload)
    assert create_res.status_code == 201

    # 2. Login as admin
    login_res = client.post(
        "/api/v1/admin/login",
        json={"username": "testadmin", "password": "SuperSecret123!"},
    )
    assert login_res.status_code == 200
    assert "access_token" in login_res.cookies

    # 3. Check /me with authenticated cookie
    me_res = client.get("/api/v1/admin/me")
    assert me_res.status_code == 200
    assert me_res.json()["username"] == "testadmin"

    # 4. List enquiries
    list_res = client.get("/api/v1/admin/enquiries")
    assert list_res.status_code == 200
    enquiries_data = list_res.json()
    assert enquiries_data["total"] >= 1
    enquiry_id = enquiries_data["enquiries"][0]["id"]
    assert enquiries_data["enquiries"][0]["status"] == "new"

    # 5. Fetch single enquiry by id
    detail_res = client.get(f"/api/v1/admin/enquiries/{enquiry_id}")
    assert detail_res.status_code == 200
    assert detail_res.json()["name"] == "Sarah Connor"

    # 6. Update enquiry status to 'in_progress'
    update_res = client.patch(
        f"/api/v1/admin/enquiries/{enquiry_id}/status",
        json={"status": "in_progress"},
    )
    assert update_res.status_code == 200
    assert update_res.json()["status"] == "in_progress"

    # 7. Update status to 'completed'
    update_res2 = client.patch(
        f"/api/v1/admin/enquiries/{enquiry_id}/status",
        json={"status": "completed"},
    )
    assert update_res2.status_code == 200
    assert update_res2.json()["status"] == "completed"

    # 8. Logout
    logout_res = client.post("/api/v1/admin/logout")
    assert logout_res.status_code == 200

    # 9. Ensure session is cleared after logout
    logged_out_res = client.get("/api/v1/admin/me")
    assert logged_out_res.status_code == 401

