import { Shield, Cloud, Eye, Lock, Activity, RefreshCcw } from 'lucide-react';

// Cuestionario basado en CSPR v3 y NIST CSF 2.0
export const ASSESSMENT_DATA = {
  pillars: [
    {
      id: "GOVERN",
      name: "Gobernanza y Estrategia",
      icon: "Shield",
      questions: [
        { id: "G1", text: "¿La seguridad es vista como un proceso transversal con presupuesto propio o solo como soporte técnico?", weight: 5 },
        { id: "G2", text: "¿Se han formalizado los tiempos de recuperación (RTO) y pérdida de datos (RPO) mediante un BIA actualizado?", weight: 5 },
        { id: "G3", text: "¿Cuenta con un roadmap de ciberseguridad alineado al crecimiento estratégico del negocio?", weight: 4 }
      ]
    },
    {
      id: "CLOUD_IDENTITY",
      name: "Cloud Identity & IAM (CSPRv3)",
      icon: "Cloud",
      questions: [
        { id: "CI1", text: "¿Se asignan permisos de Super Admin únicamente a cuentas dedicadas y separadas del uso diario?", weight: 5 },
        { id: "CI2", text: "¿Existe una restricción de dominios (Domain Restricted Sharing) activa en la organización de Google Cloud?", weight: 4 },
        { id: "CI3", text: "¿Se auditan periódicamente las llaves de Service Accounts para evitar su exposición en repositorios?", weight: 5 }
      ]
    },
    {
      id: "PERIMETER",
      name: "Seguridad Perimetral (Inicial)",
      icon: "Eye",
      questions: [
        { id: "P1", text: "¿Existe un inventario automatizado de activos que incluya IPs, certificados SSL y servicios multi-cloud?", weight: 5 },
        { id: "P2", text: "¿Se aplican controles de hardening (WAF, IPS, cierre de puertos) en todos los servicios expuestos a Internet?", weight: 4 },
        { id: "P3", text: "¿Las conexiones entre On-Premise y Cloud están cifradas y sujetas a inspección de tráfico activa?", weight: 4 }
      ]
    },
    {
      id: "PROTECT",
      name: "Protección de Datos y Acceso",
      icon: "Lock",
      questions: [
        { id: "PR1", text: "¿Se exige MFA para todas las conexiones remotas (VPN, RDP) y consolas de administración?", weight: 5 },
        { id: "PR2", text: "¿Los datos sensibles en la nube están clasificados y protegidos con controles de exfiltración?", weight: 5 },
        { id: "PR3", text: "¿Se realizan pruebas de Penetration Testing periódicas para identificar vulnerabilidades explotables?", weight: 4 }
      ]
    },
    {
      id: "DETECT_RESPOND",
      name: "Detección y Respuesta",
      icon: "Activity",
      questions: [
        { id: "DR1", text: "¿Cuenta con monitoreo 24/7 (SOC) y visibilidad centralizada de logs (SIEM) para detectar anomalías?", weight: 5 },
        { id: "DR2", text: "¿El equipo de sistemas conoce su rol y tiene procedimientos documentados para actuar ante un incidente?", weight: 4 },
        { id: "DR3", text: "¿Se miden KPIs como el Tiempo Medio de Detección (MTTD) y Tiempo Medio de Respuesta (MTTR)?", weight: 3 }
      ]
    },
    {
      id: "RECOVER",
      name: "Recuperación e Inmutabilidad",
      icon: "RefreshCcw",
      questions: [
        { id: "R1", text: "¿Existen copias de seguridad inmutables protegidas específicamente contra ataques de Ransomware?", weight: 5 },
        { id: "R2", text: "¿Se realizan pruebas de restauración del plan de recuperación (DRP) al menos una vez al año?", weight: 5 },
        { id: "R3", text: "¿Existe un programa de capacitación continua con métricas (ej. reducción de clics en Phishing simulado)?", weight: 3 }
      ]
    }
  ],
  maturityLevels: [
    { value: 1, label: "Inexistente", description: "Sin proceso ni herramienta. Riesgo máximo.", color: "#ef4444" },
    { value: 2, label: "Inicial", description: "Procesos reactivos y no documentados.", color: "#f97316" },
    { value: 3, label: "Definido", description: "Políticas documentadas y herramientas básicas.", color: "#eab308" },
    { value: 4, label: "Optimizado", description: "Monitoreo constante y mejora continua.", color: "#22c55e" }
  ]
};

export const STORAGE_KEY = 'neurallyz_assessment_progress';

export default ASSESSMENT_DATA;
