import Card from "../components/ui/Card";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center items-center h-screen gap-4">
      <Card
        title="Interactive 3D Card"
        description="Hover over me to see the 3D effect!"
        icon={<span className="text-2xl">✨</span>}
        variant="default"
      />
      <Card
        title="Accent Card"
        description="With faster spring animation"
        variant="accent"
      />
      <Card
        title="Dark Card"
        description="With slower spring animation"
        variant="dark"
      />
    </div>
  );
}

export default Home;