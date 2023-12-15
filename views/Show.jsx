const React = require('react');
//const Logs = require('../models/logs')
class Show extends React.Component {
    render () {
        const log = this.props.log;

        return (
            <div>
                <h1>Show Page</h1>
                <a href = {'/logs'} > Go to Index Page</a> <br/>
                <p>The {log.title} is {log.entry}</p>
                {log.shipIsBroken ? 'Ship is Broken' : "SHIP IS NOT BROKEN!"}
            </div>

        )
    }
}

module.exports = Show