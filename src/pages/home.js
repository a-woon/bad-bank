import Card from "../components/card";
import image from "../components/bank.png";

function Home() {
  return (
    <Card
      txtcolor="white"
      bgcolor="primary"
      header="Welcome to the BadBank!"
      width="30rem"
      body={
        <div className="card bg-primary border-0 text-center">
          <img
            className="img-fluid mx-auto"
            src={image}
            style={{ width: 250 }}
          ></img>
          <div className="card-body">
            <p>
              Say hello to a world with ZERO guarantees and 100% of the risks
            </p>
          </div>
          <div></div>
        </div>
      }
    />
  );
}

export default Home;
