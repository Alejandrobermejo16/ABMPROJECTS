import React from 'react';

class Clock extends React.Component {
    constructor() {
        super();
        this.state = { reloj: new Date() };
    }

    componentDidMount() {
        // Actualizar la hora cada segundo
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        // Limpiar el intervalo cuando el componente se desmonta
        clearInterval(this.intervalID);
    }

    tick() {
        // Actualizar el estado para reflejar la hora actual
        this.setState({
            reloj: new Date()
        });
    }

    formatearFecha(formato) {
        const { reloj } = this.state;

        // Extraer los componentes de la fecha
        const horas = String(reloj.getHours()).padStart(2, '0');
        const minutos = String(reloj.getMinutes()).padStart(2, '0');
        const segundos = String(reloj.getSeconds()).padStart(2, '0');
        const dia = String(reloj.getDate()).padStart(2, '0'); // Obtener el día del mes
        const año = reloj.getFullYear(); // Obtener el año

        // Array para los nombres de los meses
        const nombresMeses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        // Formatear la fecha según el formato especificado
        switch (formato) {
            case 'hora':
                return `${horas}:${minutos}:${segundos}`;
            case 'fecha':
                const mesFormateado = nombresMeses[reloj.getMonth()];
                return `${dia} ${mesFormateado} ${año}`;
            default:
                return 'Formato no válido';
        }
    }


    render() {
        const { formato } = this.props;

        return (
            <div>
                <span style={{ paddingLeft: '1350px' }}>
                    {formato === 'hora' && this.formatearFecha('hora')}
                    {formato === 'fecha' && this.formatearFecha('fecha')}
                    {formato === 'horayfecha' && `${this.formatearFecha('hora')} - ${this.formatearFecha('fecha')}`}
                </span>

            </div>
        );
    }
}

export default Clock;