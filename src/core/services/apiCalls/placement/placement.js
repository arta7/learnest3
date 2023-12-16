import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const placement_apis = API_URLs.placement;

export const apiCall_getAll = () => {
  return http.post(placement_apis.getAll);
};

export const apiCall_getExamDetail = (id) => {
  return http.post(placement_apis.getExamDetails + "?id=" + id);
};

export const apiCall_finishExam = ({ PlacementTestId, Answers }) => {
  const frmData = new FormData();

  frmData.append("PlacementTestId", PlacementTestId);
  Answers.forEach((item, index) => {
    frmData.append("Answers[" + index + "].questionId", item.questionId);
    frmData.append("Answers[" + index + "].answerId", item.answerId);
  });

  return http.post(placement_apis.finishtest, frmData);
};

export const apiCall_startExam = (id) => {
  return http.post(placement_apis.starttest + "?id=" + id);
};

/*


_Finishtest = async () => {

        let ws = new Webservice();
        ws.token = this.props.user.token;
        ws.url = `${placementtestsBASE_URL}finishtest`;
        this.loading._showModal()

        let formdata = new FormData();
        formdata.append("PlacementTestId", this.state.DATA.data.id);

        let as = this.state.answers;
        for (let i = 0; i < as.length; i++) {
            let item = as[i];

            formdata.append('Answers[' + i + '].questionId', item.questionId);
            formdata.append('Answers[' + i + '].answerId', item.answerId);
        }


        try {
            let response = await ws.CallApi(formdata)
            this.loading._hideModal(response, 1)
            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.status === "1") {

                this.props.navigation.replace('TestResult', responseJson)

            } else {


            }

        } catch (e) {
            this.loading._hideModal(e, 1)
            console.log(e);
        }


        // fetch("https://learnest.app/api/placementtests/finishtest", requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error))

        // console.log(formData);

        // fetch(url, {
        //     method: "POST",
        //     headers: new Headers({
        //         'Authorization':  this.props.user.token,
        //         'Content-Type': 'multipart/form-data',
        //     }),
        //     // body:formData
        //     body:formData
        // })
        //     .then(response => {
        //         console.log(response)

        //         if (!response.ok) {
        //             return response.json()
        //             // throw Error(response.statusText);
        //         }
        //         return response.json();
        //     }).then(response => {

        //         console.log('response==>', response)


        //         if (response.status === "1") {

        //             // this.setState({
        //             //     DATA: response,
        //             //     // questions:response.questions,
        //             // }, () => {
        //             //     console.log(this.state.DATA);

        //             //     this._timer()

        //             // })

        //         }
        //         else {



        //         }
        //     })
        //     .catch(error => {


        //     });

    }


*/
