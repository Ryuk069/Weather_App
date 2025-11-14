import './date.css'

function date() {
  const date = new Date();

  return (
    <div className='date'>
      {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
    </div>
  )
}

export default date