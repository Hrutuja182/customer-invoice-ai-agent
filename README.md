# customer-invoice-ai-agent
.Started with git repository :Created git repository and then clone it in folder customer-invoice-ai-agent. 
2.according intructions for Backend
  Create a root folder named customer-invoice-ai-agent and open it in VS Code. Open the integrated terminal.

  Create a backend directory: mkdir backend and then cd backend.

  Create a Python virtual environment: python -m venv venv.

  Activate the virtual environment (e.g., .\venv\Scripts\Activate.ps1 on Windows).

  Upgrade pip using trusted hosts to avoid network errors:
    # python -m pip install --upgrade pip

   Install the required backend packages:
    # pip install fastapi "uvicorn[standard]" python-multipart pymupdf pydantic-settings pytest pandast

    Save dependancies
    # pip freeze > requirements.txt

     not rendering main.py so added manually
    #  create main.py
    
    Go back to your backend terminal after frontend setup(ensure the virtual environment is active) and start the Python API:
   # uvicorn app.main:app --reload

2.frontend

  Open a new terminal panel in VS Code, navigate back to the root case_study folder, and create the frontend:
   # npm create vite@latest frontend -- --template react-ts

  When prompted by the Vite setup menu:

  Select ESLint as your linter.

  Select Yes for "Install with npm and start now?".

  Open the provided local link (typically http://localhost:5173/) in your browser to verify the frontend server is running.

  # cd frontend

  then install necessary packages
  # npm i

  then run application via: 
  # npm run dev 

Test your application by uploading the provided CSV file and checking if the UI correctly displays the performance metrics. A simple, clean UI is perfectly acceptable.

3. github 
pushed changes to branch
# git add .
# git commit -m "setup Changes"
# git push --set-upstream origin Customer-Invoice_AI_agent