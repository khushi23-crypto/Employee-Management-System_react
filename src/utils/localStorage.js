const employees = [
    {
        "id": 1,
        "firstname": "Aarav",
        "email": "e@e.com",
        "password": "123",
        "taskNumbers": {
            "active": 1,
            "new_task": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "title": "Prepare monthly report",
                "description": "Collect and analyze sales data for the last month.",
                "date": "2025-09-10",
                "category": "Reporting",
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false
            },
            {
                "title": "Team meeting",
                "description": "Discuss project milestones and blockers.",
                "date": "2025-09-12",
                "category": "Meeting",
                "active": false,
                "new_task": true,
                "completed": false,
                "failed": false
            },
            {
                "title": "Client follow-up",
                "description": "Email client about the new proposal.",
                "date": "2025-09-15",
                "category": "Communication",
                "active": false,
                "new_task": false,
                "completed": true,
                "failed": false
            }
        ]
    },
    {
        "id": 2,
        "firstname": "Ishaan",
        "email": "employee2@example.com",
        "password": "123",
        "taskNumbers": {
            "active": 1,
            "new_task": 1,
            "completed": 1,
            "failed": 1
        },
        "tasks": [
            {
                "title": "Inventory check",
                "description": "Verify warehouse stock levels.",
                "date": "2025-09-08",
                "category": "Operations",
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false
            },
            {
                "title": "Website update",
                "description": "Update the landing page with new offers.",
                "date": "2025-09-09",
                "category": "Development",
                "active": false,
                "new_task": true,
                "completed": false,
                "failed": false
            }
            
        ]
    },
    {
        "id": 3,
        "firstname": "Vihaan",
        "email": "employee3@example.com",
        "password": "123",
        "taskNumbers": {
            "active": 1,
            "new_task": 1,
            "completed": 0,
            "failed": 1
        },
        "tasks": [
            {
                "title": "Schedule training",
                "description": "Arrange a session for new hires.",
                "date": "2025-09-10",
                "category": "HR",
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false
            },
            {
                "title": "Budget approval",
                "description": "Submit the Q4 budget for review.",
                "date": "2025-09-14",
                "category": "Finance",
                "active": false,
                "new_task": false,
                "completed": false,
                "failed": true
            },
            {
                "title": "Vendor payment",
                "description": "Clear invoice from vendor X.",
                "date": "2025-09-16",
                "category": "Finance",
                "active": false,
                "new_task": true,
                "completed": false,
                "failed": false
            }
        ]
    },
    {
        "id": 4,
        "firstname": "Aditya",
        "email": "employee4@example.com",
        "password": "123",
        "taskNumbers": {
            "active": 1,
            "new_task": 1,
            "completed": 1,
            "failed": 1
        },
        "tasks": [
            {
                "title": "Code review",
                "description": "Review pull requests for the new feature.",
                "date": "2025-09-09",
                "category": "Development",
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false
            },
            {
                "title": "Documentation update",
                "description": "Update API documentation.",
                "date": "2025-09-12",
                "category": "Documentation",
                "active": false,
                "new_task": true,
                "completed": false,
                "failed": false
            },
            
        ]
    },
    {
        "id": 5,
        "firstname": "Kabir",
        "email": "employee5@example.com",
        "password": "123",
        "taskNumbers": {
            "active": 1,
            "new_task": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "title": "Marketing campaign",
                "description": "Plan social media posts for the new campaign.",
                "date": "2025-09-08",
                "category": "Marketing",
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false
            },
            {
                "title": "Data analysis",
                "description": "Analyze customer purchase patterns.",
                "date": "2025-09-11",
                "category": "Analytics",
                "active": false,
                "new_task": true,
                "completed": false,
                "failed": false
            },
            {
                "title": "Partner outreach",
                "description": "Connect with potential partners for collaboration.",
                "date": "2025-09-13",
                "category": "Business Development",
                "active": false,
                "new_task": false,
                "completed": true,
                "failed": false
            }
        ]
    }
];

const admin = [
    {
        "id": 1,
        "email": "admin@me.com",
        "password": "123"
    }
];

export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))

}
export const getLocalStorage = () => {
   const employees = JSON.parse(localStorage.getItem('employees'))
      const admin = JSON.parse(localStorage.getItem('admin'))
      
      return{employees,admin}
}