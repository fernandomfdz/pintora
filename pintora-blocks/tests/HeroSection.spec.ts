import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HeroSection from '../components/blocks/HeroSection.vue';

describe('HeroSection', () => {
  it('renders with default slots', () => {
    const wrapper = mount(HeroSection);
    
    // Verificar que el componente se renderiza correctamente
    expect(wrapper.exists()).toBe(true);
    
    // Verificar que los slots por defecto están presentes
    expect(wrapper.text()).toContain('Construye interfaces modernas con Pintora');
    expect(wrapper.text()).toContain('Una biblioteca de componentes y bloques reutilizables');
    
    // Verificar que los botones por defecto están presentes
    const links = wrapper.findAll('a');
    expect(links.length).toBe(2);
    expect(links[0].text()).toBe('Comenzar');
    expect(links[1].text()).toBe('Documentación');
  });
  
  it('renders with custom slots', () => {
    const wrapper = mount(HeroSection, {
      slots: {
        title: 'Título personalizado',
        description: 'Descripción personalizada',
        actions: '<button>Botón personalizado</button>',
        image: '<img src="test.jpg" alt="Test" />'
      }
    });
    
    // Verificar que los slots personalizados se renderizan correctamente
    expect(wrapper.text()).toContain('Título personalizado');
    expect(wrapper.text()).toContain('Descripción personalizada');
    
    // Verificar que el botón personalizado está presente
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Botón personalizado');
    
    // Verificar que la imagen personalizada está presente
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('test.jpg');
    expect(image.attributes('alt')).toBe('Test');
  });
  
  it('applies the correct variant class', async () => {
    const wrapper = mount(HeroSection, {
      props: {
        variant: 'centered'
      }
    });
    
    // Verificar que la variante se aplica correctamente
    // Nota: Esto dependerá de cómo implementes las variantes en el componente
    // Este es solo un ejemplo y puede necesitar ajustes
    
    // Cambiar la variante
    await wrapper.setProps({ variant: 'minimal' });
    
    // Verificar que la variante se actualizó correctamente
    // Esto dependerá de la implementación específica
  });
}); 