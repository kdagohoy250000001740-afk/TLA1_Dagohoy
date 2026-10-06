import { useState } from 'react'
import './App.css'

const initialCategories = [
  {
    id: 1,
    name: 'Consulting',
    description: 'Enterprise technical support contract',
  },
  {
    id: 2,
    name: 'Licensing',
    description: 'Annual software licensing and renewal revenue',
  },
]

function App() {
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [categories, setCategories] = useState(initialCategories)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = formData.name.trim()
    const description = formData.description.trim()

    if (!name || !description) {
      window.alert('Please complete both category fields before saving.')
      return
    }

    setCategories((current) => [
      { id: Date.now(), name, description },
      ...current,
    ])
    setFormData({ name: '', description: '' })
  }

  const handleDelete = (id) => {
    setCategories((current) => current.filter((category) => category.id !== id))
  }

  return (
    <main className="ledger-shell">
      <div className="ledger-card">
        <div className="card-header">
          <h1>Income Category Registration</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="txtCatName">Category Name</label>
              <input
                id="txtCatName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Consulting"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="txtCatDesc">Description</label>
              <input
                id="txtCatDesc"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Enterprise technical support contract"
                required
              />
            </div>

            <button id="btnAdd" type="submit" className="save-button">
              Save Category
            </button>
          </form>
        </div>
      </div>

      <div className="ledger-table-card">
        <div className="table-header">
          <h2>Registered Categories</h2>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="w-40">Category Name</th>
                <th>Description</th>
                <th className="action-col">Action</th>
              </tr>
            </thead>
            <tbody id="listIncomeCat">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-state">
                    No categories registered yet.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleDelete(category.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default App
