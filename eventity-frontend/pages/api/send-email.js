import {sendUserEmail} from '../../services/aws-ses'

export default async function checkUserAPI(req, res){
    const {data} = req.body

    const result = await sendUserEmail("wangulumaloba@gmail.com");
    res.json(result);
}