class User {
    constructor(username, password, role) {
      this.username = username;
      this.password = password;
      this.role = role;
    }
  
    login() {
      console.log(`${this.username} has logged in.`);
    }
  
    getRole() {
      return this.role;
    }
  
    displayFunctions() {
      // Disable all buttons by default
      document.getElementById('accessLibraryBtn').disabled = true;
      document.getElementById('checkGradesBtn').disabled = true;
      document.getElementById('manageAssignmentsBtn').disabled = true;
      document.getElementById('viewStudentReportsBtn').disabled = true;
      document.getElementById('manageUsersBtn').disabled = true;
      document.getElementById('viewSystemLogsBtn').disabled = true;
  
      // Get available functions for the user
      const availableFunctions = this.getAvailableFunctions();
      
      availableFunctions.forEach(func => {
        const button = document.getElementById(func.buttonId);
        button.disabled = false;  // Enable the button
        button.onclick = func.action;  // Assign the correct action
      });
    }
  
    getAvailableFunctions() {
      return [];
    }
  }
  
  class Student extends User {
    constructor(username, password) {
      super(username, password, 'student');
    }
  
    accessLibrary() {
      alert('Accessing student library...');
    }
  
    checkGrades() {
      alert('Checking student grades...');
    }
  
    getAvailableFunctions() {
      return [
        { buttonId: 'accessLibraryBtn', action: this.accessLibrary.bind(this) },
        { buttonId: 'checkGradesBtn', action: this.checkGrades.bind(this) }
      ];
    }
  }
  
  class Teacher extends User {
    constructor(username, password) {
      super(username, password, 'teacher');
    }
  
    manageAssignments() {
      alert('Managing assignments...');
    }
  
    viewStudentReports() {
      alert('Viewing student reports...');
    }
  
    getAvailableFunctions() {
      return [
        { buttonId: 'manageAssignmentsBtn', action: this.manageAssignments.bind(this) },
        { buttonId: 'viewStudentReportsBtn', action: this.viewStudentReports.bind(this) },
        // Allow access to student functions
        { buttonId: 'accessLibraryBtn', action: () => alert('Accessing student library...') },
        { buttonId: 'checkGradesBtn', action: () => alert('Checking student grades...') }
      ];
    }
  }
  
  class Admin extends User {
    constructor(username, password) {
      super(username, password, 'admin');
    }
  
    manageUsers() {
      alert('Managing users...');
    }
  
    viewSystemLogs() {
      alert('Viewing system logs...');
    }
  
    getAvailableFunctions() {
      // Admin has access to all functions
      return [
        { buttonId: 'accessLibraryBtn', action: () => alert('Accessing student library...') },
        { buttonId: 'checkGradesBtn', action: () => alert('Checking student grades...') },
        { buttonId: 'manageAssignmentsBtn', action: this.manageAssignments.bind(this) },
        { buttonId: 'viewStudentReportsBtn', action: this.viewStudentReports.bind(this) },
        { buttonId: 'manageUsersBtn', action: this.manageUsers.bind(this) },
        { buttonId: 'viewSystemLogsBtn', action: this.viewSystemLogs.bind(this) }
      ];
    }
  }
  
  // User data
  const users = [
    new Student('student1', 'studentPass'),
    new Teacher('teacher1', 'teacherPass'),
    new Admin('admin1', 'adminPass')
  ];
  
  function handleLogin(event) {
    event.preventDefault(); 
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      errorMessage.textContent = 'Invalid username or password.';
      return false;
    }
  
    errorMessage.textContent = ''; 
  
    user.login();
    user.displayFunctions();
  
    return false; 
  }
  