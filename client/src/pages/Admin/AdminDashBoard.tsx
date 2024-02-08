export default function AdminDashBoard() {
  return (
    <div className="flex flex-col ">
      <h2>DASHBOARD</h2>
      <div className="flex justify-evenly p-5">
        <div className="flex items-center gap-4">
          <div>icon</div>
          <div>
            <div>Total Doctor</div>
            <div>2k</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>icon</div>
          <div>
            <div>Total Patients</div>
            <div>2k</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>icon</div>
          <div>
            <div>Total Revenue</div>
            <div>10k</div>
          </div>
        </div>
      </div>
      <div>
        <h2>LATEST PATIENTS</h2>
      </div>
    </div>
  );
}
