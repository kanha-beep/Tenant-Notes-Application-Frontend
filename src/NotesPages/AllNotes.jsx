/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AllNotesCards from "../NotesPages/NotesCards/AllNotesCards.jsx";

export default function AllNotes({ toShowAdmin, filterNotes, setFilterNotes }) {
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");

  return (
    <div className="mt-4">
      {filterNotes.length === 0 && (
        <div className="text-center">
          <h3>Ask Admin to get work!</h3>
        </div>
      )}
      <div className="lg:-mx-2 lg:flex lg:flex-wrap">
        {filterNotes &&
          filterNotes.map((n) => (
            <AllNotesCards
              key={n._id}
              n={n}
              token={token}
              setFilterNotes={setFilterNotes}
              userRole={userRole}
              toShowAdmin={toShowAdmin}
            />
          ))}
      </div>
    </div>
  );
}
