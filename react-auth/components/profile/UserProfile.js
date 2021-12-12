import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>My Profile</h1>
      <h4>I can change your password here...</h4>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
