const Person = (props) => {
  let reply = props.age >= 18 ? "Please go Vote!" : "You must be 18!";
  let hobbies = props.hobbies.map((h) => <li>{h}</li>);

  return (
    <p>
      Learn some information about this person:
      <ul>
        <li>Name: {props.name.slice(0, 6)}</li>
        <li>Age : {props.age}</li>
        <ul>
          Hobbies:
          {hobbies}
        </ul>
      </ul>
      <h3>{reply}</h3>
    </p>
  );
};
