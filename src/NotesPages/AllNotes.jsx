/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AllNotesCards from "../NotesPages/NotesCards/AllNotesCards.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";

export default function AllNotes({
  navigate,
  toShowAdmin,
  filterNotes,
  setFilterNotes,
  isLoading,
  isLoaded,
  totalCount,
}) {
  const userRole = localStorage.getItem("role");

  return (
    <div className="mt-4">
      {isLoading ? (
        <LoadingSpinner text="All notes loading..." />
      ) : null}
      {!isLoading && isLoaded && totalCount === 0 ? (
        <div className="py-5 text-center">
          <p className="text-slate-500">No notes found.</p>
        </div>
      ) : null}
      {!isLoading && filterNotes?.length > 0 ? (
        <div className="lg:-mx-2 lg:flex lg:flex-wrap">
          {filterNotes.map((n) => (
            <AllNotesCards
              key={n._id}
              n={n}
              navigate={navigate}
              setFilterNotes={setFilterNotes}
              userRole={userRole}
              toShowAdmin={toShowAdmin}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
