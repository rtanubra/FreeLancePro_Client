import React, {Component} from 'react'
import './emailBody.css'

import ErrorMessage from '../../components/errorMessage/errorMessage'

import config from '../../config'

class EmailBody extends Component{
    state={
        subject:this.props.subject?this.props.subject:"Filled Subject",
        toEmail:this.props.toEmail? this.props.toEmail:"rdtanubrata1@gmail.com",
        body:this.props.body?this.props.body:"Input email here",
        preBody:`
            <style>
                table, th, td {
                border: 1px solid black;
                }
            </style>
        `,
        success:false,
        errorOverall:false,
        errorOverallMessage:""
    }
    handleSubmit= (event)=>{
        event.preventDefault()
        const emails = {
            subject:this.state.subject,
            toEmail:this.state.toEmail,
            //pre is used below so the email can be viewed in html as it is typed (with correct spacing)
            body:`${this.state.preBody?this.state.preBody:""}<pre>${this.state.body}</pre>`
        }
        emails.toEmail = this.state.toEmail.split(" ").join('').split(',')
        
        //now ready for fetch to send to new API endpoints to handle mutable emails
        
        //did not create this endpoint yet
        const url = `${config.API_ENDPOINT}/api/emails/custom`
        fetch(url,{
                method:"POST",
                headers: new Headers({
                    'content-type':'application/json',
                    "Authorization":window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
                }),
                body: JSON.stringify(emails)
        }).then((res)=>{
            if (res.error){
                //server errors
                console.log(res.error)
            } else {
                return res.json()
            }
        }).then((jsonRes)=>{
            if(jsonRes.error){
                //good error message to display
            }
            else{
                //complete

            }
        }).catch((err)=>{
        })
        
    }
    handleSubjectChange = (event)=>{
        const subject = event.target.value
        this.setState({
            subject
        })
    }
    handletoEmailChange = (event)=>{
        const toEmail = event.target.value
        this.setState({
            toEmail
        })
    }
    handleBodyChange= (event)=>{
        const body = event.target.value
        this.setState({
            body
        })
    }
    
    render(){
        return (<>
            <h2 className="css_h2_header">Email Client</h2>
            {this.state.errorOverall ? <ErrorMessage message={this.state.errorOverallMessage} />:"" }
            <div className="css_body_middle">
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="js_email_toEmail" >To (comma seperated)</label>
                    <input required onChange={this.handletoEmailChange} value={this.state.toEmail} id="js_email_toEmail" name="js_email_toEmail" type="text" />
                    <br/>

                    <label htmlFor="js_email_subject" >Subject</label>
                    <input required onChange={this.handleSubjectChange} value={this.state.subject} id="js_email_subject" name="js_email_subject" type="text" />
                    <br/>

                    <label htmlFor="js_email_body" >Body</label>
                    <br/>
                    <textarea rows="4" cols="50" onChange={this.handleBodyChange}  id="js_email_body" value={this.state.body} name="js_email_body"></textarea>
                    <br/>
                    <button className="css_button css_add_service_success" type="submit"  >Send Email(s)</button>
                </form>
            </div>
        </>)
    }
}

export default EmailBody