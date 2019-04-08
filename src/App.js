import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import Moment from 'moment';

const options = [
  { value: '591', label: '591 Mellstenintie' },
  { value: '230', label: '230 Mäkitorpantie' },
  { value: '593', label: '593 Toppelundintie' },
  { value: '110', label: '110 Maistraatintori' },
  { value: '231', label: '231 Siltavoudintie' },
  { value: '111', label: '111 Esterinportti' },
  { value: '232', label: '232 Oulunkylän asema' },
  { value: '595', label: '595 Westendintie' },
  { value: '112', label: '112 Rautatieläisenkatu' },
  { value: '233', label: '233 Kirkkoherrantie' },
  { value: '596', label: '596 Toppelundinportti' },
  { value: '113', label: '113 Veturitori' },
  { value: '234', label: '234 Otto Brandtin tie' },
  { value: '597', label: '597 Linnakepolku' },
  { value: '114', label: '114 Ratapihantie' },
  { value: '235', label: '235 Katariina Saksilaisen katu' },
  { value: '115', label: '115 Venttiilikuja' },
  { value: '236', label: '236 Hernepellontie' },
  { value: '116', label: '116 Linnanmäki' },
  { value: '237', label: '237 Aulangontie' },
  { value: '117', label: '117 Brahen puistikko' },
  { value: '238', label: '238 Pihlajamäki' },
  { value: '118', label: '118 Fleminginkatu' },
  { value: '239', label: '239 Viikin tiedepuisto' },
  { value: '119', label: '119 Gebhardinaukio' },
  { value: '240', label: '240 Viikin normaalikoulu' },
  { value: '120', label: '120 Mäkelänkatu' },
  { value: '241', label: '241 Agronominkatu' },
  { value: '121', label: '121 Vilhonvuorenkatu' },
  { value: '242', label: '242 Von Daehnin katu' },
  { value: '001', label: '001 Kaivopuisto' },
  { value: '122', label: '122 Lintulahdenkatu' },
  { value: '243', label: '243 Mustikkamaa' },
  { value: '002', label: '002 Laivasillankatu' },
  { value: '123', label: '123 Näkinsilta' },
  { value: '244', label: '244 Relanderinaukio' },
  { value: '003', label: '003 Kapteeninpuistikko' },
  { value: '124', label: '124 Isoisänsilta' },
  { value: '245', label: '245 Kulosaaren metroasema' },
  { value: '004', label: '004 Viiskulma' },
  { value: '125', label: '125 Arielinkatu' },
  { value: '246', label: '246 Tupasaarentie' },
  { value: '005', label: '005 Sepänkatu' },
  { value: '126', label: '126 Kalasataman metroasema' },
  { value: '247', label: '247 Haakoninlahdenkatu' },
  { value: '006', label: '006 Hietalahdentori' },
  { value: '127', label: '127 Teurastamo' },
  { value: '248', label: '248 Gunillantie' },
  { value: '007', label: '007 Designmuseo' },
  { value: '128', label: '128 Päijänteentie' },
  { value: '249', label: '249 Isosaarentie' },
  { value: '008', label: '008 Vanha kirkkopuisto' },
  { value: '129', label: '129 Pernajantie' },
  { value: '009', label: '009 Erottajan aukio' },
  { value: '250', label: '250 Reiherintie' },
  { value: '130', label: '130 Teollisuuskatu' },
  { value: '251', label: '251 Laajasalon ostoskeskus' },
  { value: '010', label: '010 Kasarmitori' },
  { value: '131', label: '131 Elimäenkatu' },
  { value: '252', label: '252 Humalniementie' },
  { value: '011', label: '011 Unioninkatu' },
  { value: '132', label: '132 Hollolantie' },
  { value: '253', label: '253 Tammisalon aukio' },
  { value: '012', label: '012 Kanavaranta' },
  { value: '133', label: '133 Paavalinpuisto' },
  { value: '254', label: '254 Agnetankuja' },
  { value: '013', label: '013 Merisotilaantori' },
  { value: '134', label: '134 Haukilahdenkatu' },
  { value: '255', label: '255 Laivalahden puistotie' },
  { value: '014', label: '014 Senaatintori' },
  { value: '135', label: '135 Velodrominrinne' },
  { value: '256', label: '256 Herttoniemen ranta' },
  { value: '015', label: '015 Ritarikatu' },
  { value: '136', label: '136 Sofianlehdonkatu' },
  { value: '257', label: '257 Margareetankuja' },
  { value: '016', label: '016 Liisanpuistikko' },
  { value: '137', label: '137 Arabian kauppakeskus' },
  { value: '258', label: '258 Abraham Wetterin tie' },
  { value: '017', label: '017 Varsapuistikko' },
  { value: '138', label: '138 Arabiankatu' },
  { value: '259', label: '259 Petter Wetterin tie' },
  { value: '018', label: '018 Porthania' },
  { value: '139', label: '139 Kaironkatu' },
  { value: '019', label: '019 Rautatientori / itä' },
  { value: '260', label: '260 Herttoniemen metroasema' },
  { value: '140', label: '140 Verkatehtaanpuisto' },
  { value: '261', label: '261 Asentajanpuisto' },
  { value: '020', label: '020 Kaisaniemenpuisto' },
  { value: '141', label: '141 Intiankatu' },
  { value: '262', label: '262 Siilitien metroasema' },
  { value: '021', label: '021 Töölönlahdenkatu' },
  { value: '142', label: '142 Koskelantie' },
  { value: '263', label: '263 Herttoniemen kirkko' },
  { value: '022', label: '022 Rautatientori / länsi' },
  { value: '143', label: '143 Kuikkarinne' },
  { value: '264', label: '264 Eränkävijäntori' },
  { value: '023', label: '023 Kiasma' },
  { value: '144', label: '144 Käpyläntie' },
  { value: '265', label: '265 Siilitie 9' },
  { value: '024', label: '024 Mannerheimintie' },
  { value: '145', label: '145 Pohjolankatu' },
  { value: '266', label: '266 Siilitie 13' },
  { value: '025', label: '025 Narinkka' },
  { value: '146', label: '146 Pohjolanaukio' },
  { value: '267', label: '267 Roihupelto' },
  { value: '026', label: '026 Kampin metroasema' },
  { value: '147', label: '147 Käpylän asema' },
  { value: '268', label: '268 Porolahden koulu' },
  { value: '027', label: '027 Eerikinkatu' },
  { value: '148', label: '148 Juhana Herttuan tie' },
  { value: '269', label: '269 Peukaloisentie' },
  { value: '028', label: '028 Lastenlehto' },
  { value: '149', label: '149 Toinen linja' },
  { value: '029', label: '029 Baana' },
  { value: '701', label: '701 Gallen-Kallelan tie' },
  { value: '703', label: '703 Elfvik' },
  { value: '705', label: '705 Laajalahden keskus' },
  { value: '707', label: '707 Majurinkulma' },
  { value: '709', label: '709 Yhdyskunnankuja' },
  { value: '270', label: '270 Tulisuontie' },
  { value: '150', label: '150 Töölönlahden puisto' },
  { value: '271', label: '271 Prinsessantie' },
  { value: '030', label: '030 Itämerentori' },
  { value: '272', label: '272 Marjaniementie' },
  { value: '031', label: '031 Marian Sairaala' },
  { value: '273', label: '273 Kauppakartanonkuja' },
  { value: '032', label: '032 Eläinmuseo' },
  { value: '274', label: '274 Voikukantie' },
  { value: '033', label: '033 Kauppakorkeakoulu' },
  { value: '275', label: '275 Itäkeskuksen metroasema' },
  { value: '034', label: '034 Kansallismuseo' },
  { value: '276', label: '276 Puotinharju' },
  { value: '035', label: '035 Cygnauksenkatu' },
  { value: '277', label: '277 Marjaniemi' },
  { value: '036', label: '036 Apollonkatu' },
  { value: '278', label: '278 Puotilantie' },
  { value: '037', label: '037 Töölönkatu' },
  { value: '279', label: '279 Puotinkylän kartano' },
  { value: '038', label: '038 Töölöntori' },
  { value: '039', label: '039 Ooppera' },
  { value: '711', label: '711 Kirjurinkuja' },
  { value: '713', label: '713 Upseerinkatu' },
  { value: '715', label: '715 Komentajankatu' },
  { value: '719', label: '719 Säteri' },
  { value: '280', label: '280 Puotilan ostoskeskus' },
  { value: '281', label: '281 Puotilan metroasema' },
  { value: '040', label: '040 Hakaniemen metroasema' },
  { value: '161', label: '161 Eteläesplanadi' },
  { value: '282', label: '282 Karhulantie' },
  { value: '041', label: '041 Ympyrätalo' },
  { value: '162', label: '162 Leppäsuonaukio' },
  { value: '283', label: '283 Alakiventie' },
  { value: '042', label: '042 Haapaniemenkatu' },
  { value: '163', label: '163 Lehtisaarentie' },
  { value: '284', label: '284 Myllypuron metroasema' },
  { value: '043', label: '043 Karhupuisto' },
  { value: '285', label: '285 Orpaanporras' },
  { value: '044', label: '044 Sörnäisten metroasema' },
  { value: '286', label: '286 Mamsellimyllynkatu' },
  { value: '045', label: '045 Brahen kenttä' },
  { value: '046', label: '046 Diakoniapuisto' },
  { value: '047', label: '047 Vanha Kauppahalli' },
  { value: '048', label: '048 Mastokatu' },
  { value: '049', label: '049 Annankatu' },
  { value: '721', label: '721 Säterinrinne' },
  { value: '601', label: '601 Nokkala' },
  { value: '723', label: '723 Säterinniitty' },
  { value: '603', label: '603 Matinlahdenranta' },
  { value: '725', label: '725 Rummunlyöjänkatu' },
  { value: '727', label: '727 Ratsutori' },
  { value: '607', label: '607 Nuottaniementie' },
  { value: '729', label: '729 Leppävaaranaukio' },
  { value: '609', label: '609 Sepetlahdentie' },
  { value: '050', label: '050 Melkonkuja' },
  { value: '051', label: '051 Itälahdenkatu' },
  { value: '052', label: '052 Heikkilänaukio' },
  { value: '053', label: '053 Heikkiläntie' },
  { value: '054', label: '054 Gyldenintie' },
  { value: '055', label: '055 Puistokaari' },
  { value: '056', label: '056 Luoteisväylä' },
  { value: '057', label: '057 Lauttasaaren ostoskeskus' },
  { value: '058', label: '058 Lauttasaarensilta' },
  { value: '059', label: '059 Salmisaarenranta' },
  { value: '731', label: '731 Leppävaarankäytävä' },
  { value: '611', label: '611 Matinkartanontie' },
  { value: '733', label: '733 Läkkitori' },
  { value: '613', label: '613 Matinkyläntie' },
  { value: '735', label: '735 Mestarinkatu' },
  { value: '615', label: '615 Tiistiläntie' },
  { value: '737', label: '737 Muurarinkuja' },
  { value: '617', label: '617 Tiistinkallio' },
  { value: '739', label: '739 Postipuun koulu' },
  { value: '619', label: '619 Etuniementie' },
  { value: '060', label: '060 Porkkalankatu' },
  { value: '061', label: '061 Länsisatamankatu' },
  { value: '062', label: '062 Messitytönkatu' },
  { value: '063', label: '063 Jätkäsaarenlaituri' },
  { value: '064', label: '064 Tyynenmerenkatu' },
  { value: '065', label: '065 Hylkeenpyytäjänkatu' },
  { value: '066', label: '066 Ehrenströmintie' },
  { value: '067', label: '067 Perämiehenkatu' },
  { value: '068', label: '068 Albertinkatu' },
  { value: '069', label: '069 Kalevankatu' },
  { value: '741', label: '741 Gransinmäki' },
  { value: '621', label: '621 Hauenkalliontie' },
  { value: '501', label: '501 Hanasaari' },
  { value: '623', label: '623 Nelikkotie' },
  { value: '503', label: '503 Keilalahti' },
  { value: '745', label: '745 Leppävaaran urheilupuisto' },
  { value: '625', label: '625 Suomenlahdentie' },
  { value: '505', label: '505 Westendinasema' },
  { value: '747', label: '747 Leppävaaran uimahalli' },
  { value: '627', label: '627 Piispansilta' },
  { value: '507', label: '507 Golfpolku' },
  { value: '749', label: '749 Vallikatu' },
  { value: '629', label: '629 Piispanportti' },
  { value: '509', label: '509 Revontulentie' },
  { value: '070', label: '070 Sammonpuistikko' },
  { value: '071', label: '071 Hietaniemenkatu' },
  { value: '072', label: '072 Eteläinen Hesperiankatu' },
  { value: '073', label: '073 Kesäkatu' },
  { value: '074', label: '074 Rajasaarentie' },
  { value: '075', label: '075 Korjaamo' },
  { value: '076', label: '076 Olympiastadion' },
  { value: '077', label: '077 Nordenskiöldinaukio' },
  { value: '078', label: '078 Messeniuksenkatu' },
  { value: '079', label: '079 Uimastadion' },
  { value: '751', label: '751 Vallipolku' },
  { value: '631', label: '631 Friisilänaukio' },
  { value: '511', label: '511 Sateentie' },
  { value: '753', label: '753 Linnuntie' },
  { value: '633', label: '633 Avaruuskatu' },
  { value: '513', label: '513 Hakalehto' },
  { value: '755', label: '755 Kutsuntatie' },
  { value: '635', label: '635 Kuunkatu' },
  { value: '515', label: '515 Oravannahkatori' },
  { value: '757', label: '757 Painiitty' },
  { value: '637', label: '637 Ruomelantie' },
  { value: '517', label: '517 Länsituuli' },
  { value: '518', label: '518 Tuulimäki' },
  { value: '639', label: '639 Itäportti' },
  { value: '519', label: '519 Tapionaukio' },
  { value: '080', label: '080 Jäähalli' },
  { value: '081', label: '081 Stenbäckinkatu' },
  { value: '082', label: '082 Töölöntulli' },
  { value: '083', label: '083 Meilahden sairaala' },
  { value: '084', label: '084 Paciuksenkatu' },
  { value: '085', label: '085 Jalavatie' },
  { value: '086', label: '086 Kuusitie' },
  { value: '087', label: '087 Kustaankatu' },
  { value: '088', label: '088 Kiskontie' },
  { value: '089', label: '089 Tilkanvierto' },
  { value: '761', label: '761 Mäkkylän asema' },
  { value: '641', label: '641 Komeetankatu' },
  { value: '521', label: '521 Kulttuuriaukio' },
  { value: '763', label: '763 Kalkkipellonmäki' },
  { value: '643', label: '643 Auringonkatu' },
  { value: '523', label: '523 Ahertajantie' },
  { value: '645', label: '645 Piispankallio' },
  { value: '525', label: '525 Mäntyviita' },
  { value: '767', label: '767 Ruutikatu' },
  { value: '647', label: '647 Lystimäki' },
  { value: '527', label: '527 Otsolahti' },
  { value: '769', label: '769 Tiurintie' },
  { value: '649', label: '649 Lystimäensilta' },
  { value: '529', label: '529 Keilaniemi (M)' },
  { value: '090', label: '090 Paciuksenkaari' },
  { value: '091', label: '091 Seurasaari' },
  { value: '092', label: '092 Saunalahdentie' },
  { value: '093', label: '093 Torpanranta' },
  { value: '094', label: '094 Laajalahden aukio' },
  { value: '095', label: '095 Munkkiniemen aukio' },
  { value: '096', label: '096 Huopalahdentie' },
  { value: '098', label: '098 Ulvilantie' },
  { value: '099', label: '099 Muusantori' },
  { value: '651', label: '651 Suurpellonaukio' },
  { value: '531', label: '531 Keilaranta' },
  { value: '532', label: '532 Betonimies' },
  { value: '653', label: '653 Lukutori' },
  { value: '533', label: '533 Tekniikantie' },
  { value: '537', label: '537 Innopoli' },
  { value: '538', label: '538 Hagalundinpuisto' },
  { value: '539', label: '539 Aalto-yliopisto (M), Tietotie' },
  { value: '541', label: '541 Aalto-yliopisto (M), Korkeakouluaukio' },
  { value: '543', label: '543 Otaranta' },
  { value: '545', label: '545 Sähkömies' },
  { value: '547', label: '547 Jämeräntaival' },
  { value: '549', label: '549 Maarinranta' },
  { value: '551', label: '551 Tietäjä' },
  { value: '553', label: '553 Metsänneidonpolku' },
  { value: '555', label: '555 Kalevalantie' },
  { value: '557', label: '557 Louhentori' },
  { value: '559', label: '559 Pohjankulma' },
  { value: '561', label: '561 Koivu-Mankkaa' },
  { value: '200', label: '200 Länsiterminaali' },
  { value: '563', label: '563 Mankkaanlaaksontie' },
  { value: '201', label: '201 Länsisatamankuja' },
  { value: '202', label: '202 Merihaka' },
  { value: '565', label: '565 Mankkaanaukio' },
  { value: '203', label: '203 Opastinsilta' },
  { value: '204', label: '204 A.I. Virtasen aukio' },
  { value: '205', label: '205 Ilmalan asema' },
  { value: '206', label: '206 Ruskeasuon varikko' },
  { value: '207', label: '207 Vanha Viertotie' },
  { value: '208', label: '208 Valimotie' },
  { value: '209', label: '209 Takomotie' },
  { value: '571', label: '571 Tapiolan urheilupuisto' },
  { value: '210', label: '210 Pajamäki' },
  { value: '573', label: '573 Urheilupuisto (M)' },
  { value: '211', label: '211 Haagan tori' },
  { value: '212', label: '212 Tunnelitie' },
  { value: '575', label: '575 Tontunmäentie' },
  { value: '213', label: '213 Huopalahden asema' },
  { value: '214', label: '214 Valimon asema' },
  { value: '577', label: '577 Olarinluoma' },
  { value: '215', label: '215 Pitäjänmäen asema' },
  { value: '216', label: '216 Jännetie' },
  { value: '579', label: '579 Niittymaa' },
  { value: '217', label: '217 Marttila' },
  { value: '218', label: '218 Pohjois-Haagan asema' },
  { value: '219', label: '219 Näyttelijäntie' },
  { value: '581', label: '581 Niittykumpu (M)' },
  { value: '220', label: '220 Ida Aalbergin tie' },
  { value: '583', label: '583 Haukilahdenkatu' },
  { value: '100', label: '100 Teljäntie' },
  { value: '221', label: '221 Thalianaukio' },
  { value: '101', label: '101 Munkkivuoren ostoskeskus' },
  { value: '222', label: '222 Huovitie' },
  { value: '585', label: '585 Haukilahdenaukio' },
  { value: '223', label: '223 Hämeenlinnanväylä' },
  { value: '103', label: '103 Vihdintie' },
  { value: '224', label: '224 Vesakkotie' },
  { value: '587', label: '587 Hauenkallio' },
  { value: '104', label: '104 Kriikunakuja' },
  { value: '225', label: '225 Maunula' },
  { value: '105', label: '105 Tilkantori' },
  { value: '226', label: '226 Lepolantie' },
  { value: '589', label: '589 Haukilahdenranta' },
  { value: '106', label: '106 Korppaanmäentie' },
  { value: '227', label: '227 Kylävoudintie' },
  { value: '107', label: '107 Tenholantie' },
  { value: '228', label: '228 Kustaankartano' },
  { value: '108', label: '108 Radiokatu' },
  { value: '229', label: '229 Käskynhaltijantie' },
  { value: '109', label: '109 Hertanmäenkatu' }
];

const styles = theme => ({
  /*root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },*/
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 1,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
},
});

class App extends Component {
  state = {
    selectedStation: null,
    isLoading: false,
    stationItems: [],
  }
  handleChange = (selectedStation) => {
    this.setState({
      selectedStation,
      isLoading: true
    });
    fetch(`https://exnd0cvym5.execute-api.eu-north-1.amazonaws.com/test/getbikestationhistory/${selectedStation.value}`,
      {
        headers: {
          "x-api-key": "9vpFpkbbx67kd1Xtswfw7a5W3D7oNP5g485MJYTM",
        },
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            stationItems: result.body
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error
          });
        }
      )
  }
  render() {
    const { selectedStation, stationItems } = this.state;
    const { classes } = this.props;

    return (
      <>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Kaupunkipyöräasemat
                </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <main className={classes.layout}>
          <Select
            value={selectedStation}
            onChange={this.handleChange}
            options={options}
          />
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h4" gutterBottom>
              {stationItems.length != 0 && stationItems[0].name}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Päivä</TableCell>
                  <TableCell>Kello</TableCell>
                  <TableCell align="right">Pyöriä vapaana</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stationItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{Moment(item.timestamp).format('D.M.')}</TableCell>
                    <TableCell component="th" scope="row">{Moment(item.timestamp).format('H.mm')}</TableCell>
                    <TableCell align="right">{item.bikesAvailable}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </main>
        {/*{stationItems.map(item => (
          <DataRow datetime={item.timestamp} availableCount={item.bikesAvailable} />
        ))}*/}
        {/*<Button variant="contained" color="primary">
          Hello World
      </Button>*/}
      </>
    );
  }
}

class DataRow extends Component {
  render() {
    return (
      <div
        className="component-data-row"
      >
        <span className="datetime">{this.props.datetime}</span>
        <span className="number-available">{this.props.availableCount}</span>
      </div>
    );
  }
}

export default withStyles(styles)(App);
