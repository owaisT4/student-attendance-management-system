import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Frontend/Login'
import { Signup } from './Frontend/Signup';
import { AdminDashboard } from './Frontend/AdminDashboard';
import { TeachersDashboard } from './Frontend/TeachersDashboard';
import { AddStudent } from './Frontend/AddStudent';
import {ViewStudents} from './Frontend/ViewStudents';
import {AssignToClass} from './Frontend/AssignToClass';
import {AddTeacher} from './Frontend/AddTeacher';
import {ViewTeachers} from './Frontend/ViewTeachers';
import { CreateClass } from './Frontend/CreateClass';
import { ViewClasses } from './Frontend/ViewClasses';
import { AssignClassToTeacher } from './Frontend/AssignClassToTeacher';
import { UpdateStudent } from './Frontend/UpdateStudent';
import { UpdateTeacher } from './Frontend/UpdateTeacher';
import { UpdateClass } from './Frontend/UpdateClass';
import { TeacherViewStudents } from './Frontend/TeacherViewStudents';







function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/TeachersDashboard" element={<TeachersDashboard />} />
        <Route path="/Add_Student" element={<AddStudent />} />
        <Route path="/AddTeacher" element={<AddTeacher />} />
        <Route path="/View_Students" element={<ViewStudents />} />
        <Route path="/Assign_To_Class/:studentId" element={<AssignToClass />} />
        <Route path="/View_Teachers" element={<ViewTeachers />} />
        <Route path="/Create_Class" element={<CreateClass />} />
        <Route path="View_Classes" element={<ViewClasses />} />
        <Route path="/AssignClassToTeacher/:classId" element={<AssignClassToTeacher />} />
        <Route path="/Update_Student/:studentId" element={<UpdateStudent />} />
        <Route path="/Update_Teacher/:teacherId" element={<UpdateTeacher />} />
        <Route path="/Update_Class/:classId" element={<UpdateClass />} />
        <Route path="/TeacherViewStudents/:class_id/:class_name" element={<TeacherViewStudents />} />
        <Route path="/Login" element={<Login />} />
        

        
      </Routes>
    </BrowserRouter>
 
  )
}

export default App;
