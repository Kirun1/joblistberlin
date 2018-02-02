import React, { Component } from 'react';
import { database } from 'firebase';
import _ from 'lodash';
/* import { Link } from 'react-router-dom';*/
import Job from './Job';

export default class Jobs extends Component {
	constructor(props) {
		super();
		this.state = {
			model: []
		}
	}
	componentDidMount() {
		database().ref('jobs').on('value', (snapshot) => {
			const model = _.values(snapshot.val());
			this.setState({
				model
			});
		})
	}
	render() {
		return (
			<div className="Jobs">
				<section className="Section">
					<h2>Job<small> board</small></h2>
					<p>
						If you are either looking for a job or willing to hire someone, use the following links for best results.
					</p>

					<p>
						{/* Positions in this list are all located in the <strong>Berlin area</strong>.<br/>
								Do you want to <Link to="jobs/add">add a job</Link> offer to this list?<br/> */}
						<a className="Button Button--validate" href="https://www.facebook.com/pg/joblistberlin/community/">Publish new Job</a> and share it to the community in Berlin.
					</p>
				</section>
				<section className="Section">
					<article>
						<h3><small>Usefull Facebook groups to</small> find a job in Berlin</h3>
						<ul>
							<li>
								<a href="https://www.facebook.com/groups/BerlinStartupJobs/">Berlin Startup Jobs</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/berlinexpats">Berlin Expats</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/berlinartdesignjobs">Berlin Art + Design Ads & Jobs</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/407566646051269">Berlin Startup Jobs</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/StartupJobsBerlin">Berlin Startup Jobs, Internships & Co-founders</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/berlintechjobs">Berlin Tech Jobs</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/Best.Jobs.Germany">Best Jobs Germany, Berlin</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/193382777888690">English German speaking jobs in Berlin</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/English.Jobs.Berlin">English jobs in Berlin</a>
							</li>
							<li>
								<a href="https://www.facebook.com/groups/jobinberlin">English speaking jobs in Berlin</a>
							</li>
						</ul>
					</article>
				</section>
				<section className="Section">
					<article>
						<p>Job centers are public institutions that can help you find a job. Here is a list of<a href="https://service.berlin.de/jobcenter">all <strong>Jobcenters</strong> in Berlin</a>. They can assist and give advises on how to write you resume and cover letter in German, provide german language classes and many other ressources. You should go there with someone that speaks german if you don't.</p>
					</article>
				</section>
				<section className="Section">
					{ this.state.model.map((job, index) => <Job key={ index } model={ job }/>) }
				</section>
			</div>
		)
	}
}
