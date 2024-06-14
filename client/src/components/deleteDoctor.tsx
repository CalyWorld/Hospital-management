export default function deleteDoctor(
  setAction?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>,
  id?: string,
) {
  if (!setAction) return;
  if (!setSelectedId) return;
  if (!id) return;
  setAction("deleteDoctor");
  setSelectedId(id);
}
