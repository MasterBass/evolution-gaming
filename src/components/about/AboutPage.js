import React from 'react';

class AboutPage extends React.Component {
    render() {
        return (
            <div>
                    Your task is to develop the client side for a Lobby that lists tables in a casino. The lobby should be horizontally scrollable, and should update the table information when the respective event is received from the server.
                    You should provide a convenient UI to display the tables, indicating table vacancy which takes into account the maximum amount of possible participants (hard-coded to 12 for this exercise) and current number of participants.
                    You should also provide a convenient UX to remove/delete a table with *optimistic* update of UI. If the server responds that table removal was unsuccessful, the frontend should act accordingly to update the visible content.
                    Also note - let's assume the server can return thousands of tables and your target device has a limited amount of RAM, thus it would be preferable to limit the amount of DOM elements where possible.
                    The server is accepting client connections at wss://js-assignment.evolutiongaming.com/ws_api
            </div>
        );
    };
}

export default AboutPage;