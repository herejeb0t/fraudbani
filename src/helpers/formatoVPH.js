import { JSONFilePreset } from 'lowdb/node'
import { SUCURSALES } from '../config/sucursales.js'

const db = await JSONFilePreset('./data/vph.json', { registros: {} })

const TZ = 'America/Mexico_City'

function horaActualCDMX() {
  return parseInt(
    new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hour12: false }).format(new Date())
  )
}

function fechaHoy() {
  const d = new Date()
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d) // yyyy-mm-dd
}

function fechaLegible() {
  const d = new Date()
  const dia = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, weekday: 'long' }).format(d)
  const fecha = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, day: '2-digit', month: '2-digit', year: 'numeric' }).format(d)
  return { dia: dia.charAt(0).toUpperCase() + dia.slice(1), fecha }
}

function formatHora12(h) {
  const hh = h % 24
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return `${String(h12).padStart(2, '0')}:00`
}

function detectarTurno(sucursal) {
  const h = horaActualCDMX()
  for (const [key, t] of Object.entries(sucursal.turnos)) {
    if (t.inicio < t.fin) {
      if (h >= t.inicio && h < t.fin) return key
    } else {
      // turno que cruza medianoche (ej. 23 -> 7)
      if (h >= t.inicio || h < t.fin) return key
    }
  }
  return Object.keys(sucursal.turnos)[0] // fallback
}

function listaHoras(turno) {
  const horas = []
  let h = turno.inicio
  while (h !== turno.fin) {
    horas.push(h)
    h = (h + 1) % 24
  }
  return horas
}

export async function marcarHora(sucursalKey, marca, horaManual = null) {
  const sucursal = SUCURSALES[sucursalKey]
  if (!sucursal) throw new Error('Sucursal no encontrada')

  const fecha = fechaHoy()
  const turnoKey = detectarTurno(sucursal)
  const hora = horaManual ?? horaActualCDMX()

  db.data.registros[sucursalKey] ??= {}
  db.data.registros[sucursalKey][fecha] ??= {}
  db.data.registros[sucursalKey][fecha][hora] = marca // true = ✅, false = ❌
  await db.write()

  return generarReporte(sucursalKey)
}

export function generarReporte(sucursalKey) {
  const sucursal = SUCURSALES[sucursalKey]
  if (!sucursal) throw new Error('Sucursal no encontrada')

  const fecha = fechaHoy()
  const turnoKey = detectarTurno(sucursal)
  const turno = sucursal.turnos[turnoKey]
  const registros = db.data.registros?.[sucursalKey]?.[fecha] || {}
  const horaActual = horaActualCDMX()
  const { dia, fecha: fechaLeg } = fechaLegible()

  let lineas = []
  lineas.push(`*${sucursal.nombre}*`)
  lineas.push(`*${turnoKey}*${turno.emoji}| Ventas por Hora`)
  lineas.push(`*${dia}* ${fechaLeg}`)

  for (const h of listaHoras(turno)) {
    const marca = registros[h]
    let icono
    if (marca === true) icono = '✅'
    else if (marca === false) icono = '❌'
    else icono = h <= horaActual ? '❌' : '⬜' // pasado sin marcar = no venta, futuro = pendiente
    lineas.push(`${formatHora12(h)} | ${icono}`)
  }

  return lineas.join('\n')
}