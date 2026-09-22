const Student = () => {
  const studentName = "Ashvi";
  const age = 22;
  const course = "React JS";
  const isActive = true;
  const fees = 50000;

  return (
    <div>
      <h2>Student Details</h2>

      <p>Student Name: {studentName}</p>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
      <p>Fees: {fees}</p>
    </div>
  );
};

export default Student;


