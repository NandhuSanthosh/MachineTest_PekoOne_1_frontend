import React from 'react'

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const IndividualMessageTile = ({text, date, isSendByCurrUser}) => {
  return (
    <div className={` flex ${isSendByCurrUser ? "justify-end" : ""}`}>
      <div className={`relative min-w-28 px-6 py-3 pb-4 rounded-t-2xl ${isSendByCurrUser ? "rounded-bl-2xl bg-primary-red text-white" : "rounded-br-2xl bg-gray-200 text-gray-700"}`}>
        <div>
          {text}
        </div>
        <div className='absolute right-2 bottom-0 text-xs'>
          { formatAMPM(date) }
        </div>
      </div>
    </div>
  )
}

export default IndividualMessageTile
