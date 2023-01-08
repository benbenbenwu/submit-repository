import { connect } from "react-redux"

const Notification = ({ notification }) => {
  const { type, mess } = notification
  return <>
    <h2 style={
      type === 'none'
        ? {}
        : type === 'error'
          ? { color: 'red', border: '2px solid red' }
          : { color: 'green', border: '2px solid green' }}>{mess}</h2>
  </>
}


export default connect(
  state => ({ notification: state.notification })
)(Notification)