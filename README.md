
# Vehicle Spare Part Delivery System


## Features

1. **Home Page**: Dynamic graphs for revenue based on day, month, and year.
2. **Customer Page**: Add, edit, and view customer details.
3. **Spare Part Page**: Add, edit, and view spare part details.
4. **Orders Page**: View and manage orders with details in a popup.
5. **Point of Sale (POS) Page**: Add multiple items to an order and calculate total checkout dynamically.

---

## Technologies Used

- **Backend**: Django REST Framework
- **Frontend**: ReactJS with Bootstrap for UI
- **Charting Library**: Recharts
- **Database**: SQLite (default) or any Django-supported database

---

## Setup Instructions

### Prerequisites

1. **Python 3.8+** installed on your system.
2. **Node.js and npm** installed for the React frontend.
3. **Django and required Python packages** installed in a virtual environment.

---

### Backend Setup (Django)

1. Clone the repository:
   ```bash
   git clone https://github.com/saivineeth181/assignment-fyn-mobility.git
   cd assignment-fyn-mobility/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

5. Run the backend server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

### Frontend Setup (React)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Run Instructions

1. Ensure both backend and frontend servers are running:
   - Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - Frontend: [http://localhost:3000](http://localhost:3000)

2. Open the frontend in your browser at [http://localhost:3000](http://localhost:3000).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
