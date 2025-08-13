import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/adminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment"; // For formatting the date

const NewsletterDashboard = () => {
    const [newsletters, setNewsletters] = useState([]);

    // Fetch all newsletter subscriptions
    const fetchNewsletters = async () => {
        try {
            const { data } = await axios.get("http://localhost:8050/api/newsletter");
            if (data.success) {
                setNewsletters(data.newsletters);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch newsletters");
        }
    };

    useEffect(() => {
        fetchNewsletters();
    }, []);

    return (
        <Layout title="Manage Newsletter Subscriptions">
            <div className="container-fluid py-4" style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
                <div className="row">
                    {/* Admin Sidebar */}
                    <AdminMenu />

                    {/* Newsletter Subscription Table */}
                    <div className="col-lg-9">
                        <div className="card shadow-lg border-0">
                            <div className="card-header text-white" style={{ backgroundColor: "#494a53" }}>
                                <h3 className="mb-0">Manage Newsletter Subscriptions</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="text-white" style={{ backgroundColor: "#343a40" }}>
                                            <tr>
                                                <th>#</th>
                                                <th>Email</th>
                                                <th>Subscribed On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsletters.length > 0 ? (
                                                newsletters.map((newsletter, index) => (
                                                    <tr key={newsletter._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{newsletter.email}</td>
                                                        <td>{moment(newsletter.createdAt).format("DD MMM YYYY, h:mm A")}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted">
                                                        No subscriptions found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NewsletterDashboard;
