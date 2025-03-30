import Card from "../components/ui/Card";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        title="Interactive 3D Card"
        description="Hover over me to see the 3D effect!"
      />
    </div>
  );
}

export default Home;