import useProtectAccess from "../hooks/useProtectAccess";

export default function Settings() {
  const { hasEditAccess, hasViewAccess } = useProtectAccess('Settings');

  if (!hasViewAccess) {
    return <></>
  }

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}