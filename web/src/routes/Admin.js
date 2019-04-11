import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styles/admin.scss'
import { HashLink as Link } from 'react-router-hash-link'

import PackageTable from './admin/PackageTable'

export default () => {

  return (
    <div className="dark">
      <nav className="nav-1 navbar navbar-light fixed-top">
        <div className="container">
          <ul className="nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#packages">Packages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#categories">Categories</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section id="packages" className="heading">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-auto ml-auto">
                <h1 className="brand-heading">Packages</h1>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="container content">
        <PackageTable />
      </section>

      <section id="categories" className="heading">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-auto">
                <h1 className="brand-heading">Categories</h1>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="container content">
        <div className="row">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer id="footer">
      </footer>
    </div>
  )
}
