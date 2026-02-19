import React from 'react';
import { Shield, Cloud, Eye, Lock, Activity, RefreshCcw } from 'lucide-react';

// Mapa de iconos por nombre
const ICON_MAP = {
  Shield: Shield,
  Cloud: Cloud,
  Eye: Eye,
  Lock: Lock,
  Activity: Activity,
  RefreshCcw: RefreshCcw,
};

/**
 * Renderiza el icono del pilar basado en su nombre
 */
const PillarIcon = ({ iconName, className = "w-5 h-5" }) => {
  const IconComponent = ICON_MAP[iconName] || Shield;
  return <IconComponent className={className} />;
};

export default PillarIcon;
