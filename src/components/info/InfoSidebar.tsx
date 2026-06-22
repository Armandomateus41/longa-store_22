import { NavLink } from "react-router-dom";
import { infoNavItems } from "../../data/storeInfo";

export function InfoSidebar() {
  return (
    <aside className="info-sidebar" aria-label="Menu institucional">
      <nav>
        <ul className="info-sidebar__list">
          {infoNavItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `info-sidebar__link${isActive ? " is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
