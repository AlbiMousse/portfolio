module TechnologiesHelper
  # Map technology names to Devicon logo URLs
  TECH_LOGOS = {
    "React" => "react",
    "Vue.js" => "vuejs",
    "Tailwind CSS" => "tailwindcss",
    "JavaScript" => "javascript",
    "TypeScript" => "typescript",
    "HTML/CSS" => "html5",
    "Node.js" => "nodejs",
    "Python" => "python",
    "PostgreSQL" => "postgresql",
    "MySQL" => "mysql",
    "MongoDB" => "mongodb",
    "Redis" => "redis",
    "SQLite" => "sqlite",
    "Ruby" => "ruby",
    "CSS" => "css3",
    "HTML" => "html5"
  }.freeze

  def technology_logo_url(skill)
    logo_name = TECH_LOGOS[skill]
    return nil unless logo_name
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/#{logo_name}/#{logo_name}-original.svg"
  end

  def technology_logo_exists?(skill)
    TECH_LOGOS.key?(skill)
  end
end
