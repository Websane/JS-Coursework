import React from "react";
//объявляем компонент для количества лайков
const LikesSum = (props) => {
    return (
        <div>
            Понравилось: {props.likes}
        </div>
    )
}

export default LikesSum;