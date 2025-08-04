## ASMP25-26

###Frontend Setup (React)
   ```bash
   cd Frontend
   npm install
   npx update-browserslist-db@latest
   npm install caniuse-lite   
   ```
**Run development server:**
   ```bash
   npm run dev
   ```

###  Backend Setup (Django)
   ```bash
there is a virtual environment called venv maybe activate it if you want
   cd Backend
   python manage.py makemigrations 
   python manage.py makemigrations Authentication Mentors Registrations 
   python manage.py migrate
   ```
**Create admin user:**
  ```bash
  python manage.py createsuperuser
  ```

**Run server**
  ```bash
  python manage.py runserver
  ```

  


