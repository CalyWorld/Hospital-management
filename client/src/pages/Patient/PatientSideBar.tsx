export default function PatientSideBar() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <a href={`/doctor`}>Doctor</a>
            </li>
            <li>
              <a href={`/patient`}>Patient</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
