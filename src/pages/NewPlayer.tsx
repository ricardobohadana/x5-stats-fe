import React, { useState } from "react"
import { notify } from "../api/notify"
import { Lane } from "../types/lane"
import { playerService } from "../api/players"
import { useGlobalStore } from "../stores/store"

export const NewPlayer: React.FC = () => {
  const showLoading = useGlobalStore((state) => state.showLoading)
  const hideLoading = useGlobalStore((state) => state.hideLoading)

  const [formData, setFormData] = useState({
    nickname: "",
    gamerTag: "",
    role: Lane.TOP,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    showLoading()
    const { nickname, gamerTag, role } = formData

    if (!nickname || !gamerTag || !role) {
      const feedback = "Por favor, preencha todos os campos antes de cadastrar!"
      notify(feedback, "error")
    }

    await playerService.create({
      nickname,
      gamerTag,
      lane: role,
    })

    const feedback = "Jogador cadastrado com sucesso!"
    notify(feedback, "success")
    // Reset form
    hideLoading()
    setFormData({
      nickname: "",
      gamerTag: "",
      role: Lane.TOP,
    })
  }

  return (
    <div className="flex items-center justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Novo jogador</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Text Input */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              Apelido
            </label>
            <div className="mt-1">
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                placeholder="apelido: cleo, beco, leknin"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="gamerTag"
              className="block text-sm font-medium text-gray-700"
            >
              Nome no jogo
            </label>
            <div className="mt-1">
              <input
                id="gamerTag"
                name="gamerTag"
                type="text"
                required
                placeholder="gamer tag: kc1r dog, Uploading"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.gamerTag}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Select Input */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Principal rota
            </label>
            <div className="mt-1">
              <select
                id="role"
                name="role"
                required
                className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Selecione uma rota</option>
                <option value={Lane.TOP}>Topo</option>
                <option value={Lane.JG}>Selva</option>
                <option value={Lane.MID}>Meio</option>
                <option value={Lane.ADC}>Atirador</option>
                <option value={Lane.SUP}>Suporte</option>
              </select>
            </div>
          </div>

          {/* <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Tier
            </label>
            <div className="mt-1">
              <select
                id="category"
                name="category"
                required
                className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Selecione um tier</option>
                <option value="1">1 - nunca feeda</option>
                <option value="2">2 - joga bem constantemente</option>
                <option value="3">3 - 50 / 50</option>
                <option value="4">4 - mais atrapalha que ajuda</option>
                <option value="5">5 - não quero no meu time</option>
              </select>
            </div>
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-800"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
