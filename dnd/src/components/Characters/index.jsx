import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { Redirect } from "react-router-dom";
import { ADD_CHARACTER } from "../../utils/mutations";

function Character() {
  const { loading, data } = useQuery(GET_ME);
  const [
    createCharacter,
    { called, loading: mutationLoading, error },
  ] = useMutation(ADD_CHARACTER);
  if (loading) return <></>;
  if (!data?.me) return <Redirect to="/" />;
  if (called && !mutationLoading && !error) return <Redirect to="/chat" />;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const character = [...formData.entries()].reduce((obj, [key, value]) => {
      obj[key] = isNaN(value) ? value : +value;
      return obj;
    }, {});

    await createCharacter({
      variables: { character },
    });
  };

  //JSX
  return (
    <div className="align-items-center d-flex">
      <h1 className="boarder-right">Create Charactor</h1>
      <form onSubmit={handleSubmit}>
        <h3>Character Name</h3>

        <h3>Race</h3>
        <select name="race" defaultValue="">
          <option value="" disabled></option>
          {[
            "elf",
            "human",
            "dwarf",
            "half-elf",
            "orc",
            "dragonborn",
            "gnome",
            "tiefling",
            "tabaxi",
            "changeling",
          ].map((race) => (
            <option value={race} key={race}>
              {race}
            </option>
          ))}
        </select>
        <h3>class</h3>
        <select name="class" defaultValue="">
          <option value="" disabled></option>
          {[
            "cleric",
            "bard",
            "wizard",
            "druid",
            "barbarian",
            "monk",
            "sorcerer",
            "fighter",
            "artificer",
          ].map((job) => (
            <option value={job} key={job}>
              {job}
            </option>
          ))}
        </select>
        <h3>HP</h3>
        <input type="text" name="hp" />
        <h3>Stats</h3>
        <input type="text" name="stat" />
        {/* <h3>notes</h3> */}
        {/* <input type="text" name="notes" />
        will be array */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Character;
