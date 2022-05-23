const App = () => (
  <div>
    <Tweet
      name="Example1"
      username="ex1"
      message="THIS IS EX1!"
      date={new Date().toString()}
    />
    <br></br>
    <Tweet
      name="Example2"
      username="ex2"
      message="THIS IS EX2!"
      date={new Date().toString()}
    />
    <br></br>
    <Tweet
      name="Example3"
      username="ex3"
      message="THIS IS EX3!"
      date={new Date().toString()}
    />
  </div>
);
