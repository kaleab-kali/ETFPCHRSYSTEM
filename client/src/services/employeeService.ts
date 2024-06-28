// employeeService.ts

export const getEmployeeData = async (id: string) => {
    // Function to fetch employee data from the API
    // Replace the URL and parameters as per your API
    const response = await fetch(`https://your-api-url/employee/${id}`);
    const data = await response.json();
    return data;
  };
  
  export const updateEmployeeData = async (id: string, updatedData: any) => {
    // Function to update employee data
    // Replace the URL and parameters as per your API
    const response = await fetch(`https://your-api-url/employee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  };
  
  // Add more functions as needed for other operations like create, delete, etc.
  
