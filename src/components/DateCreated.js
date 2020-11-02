import React from "react";
//объявляем компонент для даты размещения фото
const DateCreated = (props) => {
    return (
        <div>
            Дата размещения: {props.date}
        </div>
    );
}

export default DateCreated;