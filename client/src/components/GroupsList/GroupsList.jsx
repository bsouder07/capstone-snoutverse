import { Link } from "react-router-dom";

function GroupList() {

    return (
        <div>
            {profileUser?.groups.map((group) => {
                <div key={group._id}>
                    <img className="groupImg" src={group.groupIcon}/>
                    <Link to={group._id}>{group.name}</Link>
                </div>
            })}
        </div>
    )
}

export default GroupList;