import PropTypes from "prop-types";

function TwitterFollowCard({
  name,
  username,
  imageId,
  isFollowing,
  setAvatars,
  avatars,
  avatar,
}) {
  const followerHandler = (avatars, avatar) => {
    setAvatars([...avatars], (avatar.isFollowing = !avatar.isFollowing));
  };

  const imageUrl = `https://i.pravatar.cc/150?img=${imageId}`;

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          src={imageUrl}
          alt={`El avatar de ${name}`}
        />
        <div className="tw-followCard-info">
          <strong className="tw-followCard-fullName">{name}</strong>
          <span className="tw-followCard-username">{username}</span>
        </div>
      </header>
      <aside className="tw-followCard-buttonContainer">
        <button
          onClick={() => followerHandler(avatars, avatar)}
          className="tw-followCard-button"
        >
          {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
      </aside>
    </article>
  );
}

TwitterFollowCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  imageId: PropTypes.number,
  isFollowing: PropTypes.bool,
  setAvatars: PropTypes.func,
  avatars: PropTypes.array,
  avatar: PropTypes.object,
};
export default TwitterFollowCard;
