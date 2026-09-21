// export type Solicitacao = {
//     id: number,
//     position: google.maps.LatLgnLiteral;
//     tipo: string
// }

export type MarcadorServico = {
    id: number;
    situacao: "pendente" | "concluida" | "negada";
    coordenadas: { lat: number; lng: number };
};