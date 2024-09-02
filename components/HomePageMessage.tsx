type Props = {
  name?: string;
  city?: string;
  visitTime?: string;
};

export default function HomePageMessage({
  name = "Your friend",
  city = "your city",
  visitTime = "soon",
}: Props) {
  return (
    <div className="homepage-message">
      <p>
        I’m going to visit {city} {visitTime} and would love your help to make
        the most of my time there! Since you’re a local there, I’m sure you have
        some amazing recommendations for me. 😊
      </p>
      <p>
        I’d love to hear your top picks for each of the categories below. Your
        suggestions would really help me out!
      </p>
      <p>Thank a bunch 💐</p>
      <p>{name}</p>
    </div>
  );
}
