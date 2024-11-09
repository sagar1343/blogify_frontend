import ProfileCard from "../components/ProfileCard";
import UserDetailsSection from "../components/UserDetailsSection";

function ProfilePage() {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-6 gap-20 justify-center lg:justify-items-stretch">
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-10">
          <ProfileCard />
        </div>
      </div>
      <div className="lg:col-span-4 mb-20">
        <UserDetailsSection />
      </div>
    </div>
  );
}

export default ProfilePage;
