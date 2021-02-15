import '../pages/Viewticket/styles.css';

export default function Ticketparam(props) {
    return (

        props.name == null?
            <></>
        :
            <div className="paramTicket">
                <div className="nameField">
                    {props.title}
                </div>
                <div className="dataParam">
                    {
                        props.name === false?
                            "Não"
                        :
                        props.name === true?
                            "Sim"
                        :
                        props.name
                    }
                </div>
            </div>
        
    );
}