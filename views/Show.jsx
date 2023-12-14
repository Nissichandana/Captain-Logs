const React = require('react');
const Logs = require('../models/logs')
class Show extends React.Component {
    render () {
        const logs = this.props.logs;

        return (
            <div>
                <h1>Show Page</h1>
                <a href = {'/logs'} > Go to Index Page</a> <br/>
                <p>The {Logs.title} is {Logs.entry}</p>
                {Logs.shipIsBroken ? 'Ship is Broken' : "SHIP IS NOT BROKEN!"}
            </div>

        )
    }
}

module.exports = Show;