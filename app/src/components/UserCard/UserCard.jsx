const UserCard = ({ userName, className }) => {
    return (
        <div className={className}>
            <h3 className="">{userName}</h3>
        </div>
    )
}

export default UserCard
